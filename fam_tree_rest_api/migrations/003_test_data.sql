INSERT INTO individuals(first_name, last_name, date_of_birth) values
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

INSERT INTO relationships values
(1, 1, 2, 'blood', 'child', 'parent'),
(4, 1, 3, 'blood', 'child', 'parent'),
(2, 3, 2, 'married', 'spouse', 'spouse'),
(3, 4, 3, 'blood', 'parent', 'child');
