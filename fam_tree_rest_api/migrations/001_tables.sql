CREATE TABLE IF NOT EXISTS Individuals (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(60),
    last_name VARCHAR(60),
    date_of_birth DATE
);

CREATE TABLE IF NOT EXISTS Families (
    id SERIAL PRIMARY KEY,
    boss_of_the_family INT REFERENCES Individuals,
    family_name VARCHAR(60)
);

CREATE TABLE IF NOT EXISTS IndividualToFamilies (
    individual_id INT REFERENCES Individuals,
    family_id INT REFERENCES Families
);

CREATE TYPE role AS ENUM ('parent', 'child', 'spouse', 'sibling');
CREATE TYPE reltype AS ENUM ('blood', 'married', 'divorced', 'adopted');

CREATE TABLE IF NOT EXISTS Relationships (
    id SERIAL PRIMARY KEY,
    individual_1_id integer REFERENCES Individuals (id) ON DELETE CASCADE,
    individual_2_id integer REFERENCES Individuals (id) ON DELETE CASCADE,
    relationship_type reltype,
    individual_1_role role,
    individual_2_role role
);
