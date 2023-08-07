INSERT INTO department (name)
VALUES ("Painting"),
       ("Sculpture"),
       ("Photography"),
       ("Printmaking"),
       ("Drawing"),
       ("Ceramics");

INSERT INTO role (id, title, salary, department_id)
VALUES (001, "Art Instructor", 50000, 1),
       (002, "Studio Manager", 60000, 1),
       (003, "Sculpture Artist", 55000, 2),
       (004, "Photographer", 52000, 3),
       (005, "Printmaker", 53000, 4),
       (006, "Drawing Instructor", 50000, 5),
       (007, "Ceramics Artist", 54000, 6),
       (008, "Gallery Curator", 52000, 3),
       (009, "Art Educator", 51000, 5),
       (010, "Art Researcher", 54000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, "Emily", "Funk", 7, 6),
       (002, "Brandon", "Cruz", 4, 3),
       (003, "Brie", "Funk", 1, NULL),
       (004, "Athena", "Cruz", 2, 1),
       (005, "Noemi", "Bou", 3, 2),
       (006, "Kevin", "Funk", 5, 4),
       (007, "Olivia", "Funk", 6, 5),
       (008, "Andy", "BLuz", 8, NULL),
       (009, "Alex", "Lemons", 9, NULL),
       (010, "Cris", "Beatz", 10, NULL);