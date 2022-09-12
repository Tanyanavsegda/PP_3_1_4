package ru.kata.spring.boot_security.demo.services;

import ru.kata.spring.boot_security.demo.models.Role;


import java.util.List;

public interface RolesService {
    List<Role> getAllRoles();

    Role getRole(String userRole);

    Role getRoleById(int id);

    void addRole(Role role);

}
