INSERT INTO Individuals(names, hometown, date_of_birth, gender) values
('Son Test1', 'Danville', '2000-02-15', 'male'),
('Dad Test1', 'Danville', '1976-10-21', 'male'),
('Mom Test', 'Danville', '1979-01-03', 'female'),
('MomsDad Test', 'Oakton', '1941-05-13', 'male');

INSERT INTO families values (1, 'username', 4, 'Test');

INSERT INTO individualtofamilies values
(1, 1),
(2, 1),
(3, 1),
(4, 1);

INSERT INTO relationships
(
  individual_1_id,
  individual_2_id,
  relationship_type,
  individual_1_role,
  individual_2_role
)
values
(1, 2, 'blood', 'child', 'parent'),
(1, 3, 'blood', 'child', 'parent'),
(3, 2, 'married', 'spouse', 'spouse'),
(4, 3, 'blood', 'parent', 'child');
