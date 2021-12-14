INSERT INTO Individuals(first_name, last_name, date_of_birth) values
('Son', 'Test1', '2000-02-15'),
('Dad', 'Test1', '1976-10-21'),
('Mom', 'Test', '1979-01-03'),
('MomsDad', 'Test', '1941-05-13');

INSERT INTO families values (1, 4, 'Test');

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
