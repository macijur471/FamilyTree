use std::str::FromStr;

use super::{
    relationships::{PreparedRelation, RelType, Relationships, Role},
    Id, Individual, PgId,
};

use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug, Default)]
pub struct FamTree {
    pub id: String,
    pub gender: String,
    pub siblings: Vec<PreparedRelation>,
    pub parents: Vec<PreparedRelation>,
    pub children: Vec<PreparedRelation>,
    pub spouses: Vec<PreparedRelation>,
}

impl FamTree {
    pub fn from_rels(ids: &Vec<(Id, String)>, rels: &Vec<Relationships>) -> Vec<FamTree> {
        let converted = ids
            .iter()
            .map(|(id, gender)| {
                let mut siblings = Vec::new();
                let mut parents = Vec::new();
                let mut spouses = Vec::new();
                let mut children = Vec::new();

                let mut role_matcher = |role_from_sql: &Role, prep_rel: PreparedRelation| {
                    match role_from_sql {
                        Role::Child => children.push(prep_rel),
                        Role::Parent => parents.push(prep_rel),
                        Role::Spouse => spouses.push(prep_rel),
                        Role::Sibling => siblings.push(prep_rel),
                    };
                };

                let mut create_prep_relation = |id_for_rel: Id, role: &Role, rel_type: RelType| {
                    role_matcher(
                        role,
                        PreparedRelation {
                            id: id_for_rel.unwrap().to_string(),
                            rel_type,
                        },
                    );
                };

                rels.iter().for_each(|rel| {
                    match id {
                        n if rel.individual_1_id == *n => create_prep_relation(
                            rel.individual_2_id,
                            &rel.individual_2_role,
                            rel.relationship_type,
                        ),
                        n if rel.individual_2_id == *n => create_prep_relation(
                            rel.individual_1_id,
                            &rel.individual_1_role,
                            rel.relationship_type,
                        ),
                        _ => (),
                    };
                });
                FamTree {
                    id: id.unwrap().to_string(),
                    gender: gender.to_string(),
                    siblings,
                    parents,
                    children,
                    spouses,
                }
            })
            .collect();

        converted
    }
}

#[test]
fn test_empty_input_results_empty_tree() {
    let ids: Vec<(Id, String)> = Vec::new();
    let rels: Vec<Relationships> = Vec::new();

    let result = FamTree::from_rels(&ids, &rels);
    assert!(result.is_empty())
}

#[test]
fn test_single_id_input_results_single_ind() {
    let id = 1i32;
    let ids: Vec<(Id, String)> = vec![(Some(id), "test".to_string())];
    let rels: Vec<Relationships> = Vec::new();

    let result = FamTree::from_rels(&ids, &rels);

    assert_eq!(result.len(), 1);
    assert_eq!(result[0].id, id.to_string());
    assert!(result[0].children.is_empty());
    assert!(result[0].parents.is_empty());
    assert!(result[0].spouses.is_empty());
    assert!(result[0].siblings.is_empty());
}

#[test]
fn test_relations_correct_output() {
    let ids: Vec<(Id, String)> = vec![
        (Some(1), "test1".to_string()),
        (Some(2), "test2".to_string()),
        (Some(3), "test3".to_string()),
    ];
    let rels: Vec<Relationships> = vec![
        Relationships {
            id: Some(0),
            individual_1_id: ids[0].0,
            individual_2_id: ids[1].0,
            relationship_type: RelType::Blood,
            individual_1_role: Role::Child,
            individual_2_role: Role::Parent,
        },
        Relationships {
            id: Some(1),
            individual_1_id: ids[1].0,
            individual_2_id: ids[2].0,
            relationship_type: RelType::Married,
            individual_1_role: Role::Spouse,
            individual_2_role: Role::Spouse,
        },
        Relationships {
            id: Some(2),
            individual_1_id: ids[2].0,
            individual_2_id: ids[0].0,
            relationship_type: RelType::Blood,
            individual_1_role: Role::Parent,
            individual_2_role: Role::Child,
        },
    ];

    let result = FamTree::from_rels(&ids, &rels);

    assert_eq!(result.len(), 3);
    assert_eq!(result[1].children.len(), 1);
    assert_eq!(result[2].children.len(), 1);
    assert_eq!(result[0].parents.len(), 2);
    assert_eq!(result[1].spouses.len(), 1);
    assert_eq!(result[2].spouses.len(), 1);
}
