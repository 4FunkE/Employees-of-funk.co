INSERT INTO department (name)
VALUES ("Painting"),
       ("Sculpture"),
       ("Photography"),
       ("Printmaking"),
       ("Drawing"),
       ("Ceramics");

INSERT INTO role (title, salary, department_id)
VALUES ("Art Instructor", 50000, 1),
       ("Studio Manager", 60000, 1),
       ("Sculpture Artist", 55000, 2),
       ("Photographer", 52000, 3),
       ("Printmaker", 53000, 4),
       ("Drawing Instructor", 50000, 5),
       ("Ceramics Artist", 54000, 6),
       ("Gallery Curator", 52000, 3),
       ("Art Educator", 51000, 5),
       ("Art Researcher", 54000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Emily", "Funk", 7, 6),
       ("Brandon", "Cruz", 4, 3),
       ("Brie", "Funk", 1, NULL),
       ("Athena", "Cruz", 2, 1),
       ("Noemi", "Bou", 3, 2),
       ("Kevin", "Funk", 5, 4),
       ("Olivia", "Funk", 6, 5),
       ("Andy", "BLuz", 8, NULL),
       ("Alex", "Lemons", 9, NULL),
       ("Cris", "Beatz", 10, NULL);