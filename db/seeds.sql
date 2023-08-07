INSERT INTO department (name)
VALUES ("Painting"),
       ("Algebra I"),
       ("Algebra I"),

INSERT INTO role (id, title, salary, department_id)
VALUES (001, "Algebra I", 000, 1),
       (002, "Algebra I", 000, 1),
       (003, "Algebra I", 000, 1),
       (004, "Algebra I", 000, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, "Algebra I", "Linear equations", 1, 1, NULL),
       (002, "Algebra I", "Linear equations", 1, 1, NULL),
       (003, "Algebra I", "Linear equations", 1, 1, NULL),
       (004, "Algebra I", "Linear equations", 1, 1, NULL);