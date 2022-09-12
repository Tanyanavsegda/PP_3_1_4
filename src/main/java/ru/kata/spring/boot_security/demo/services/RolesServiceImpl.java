package ru.kata.spring.boot_security.demo.services;

import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.models.Role;

import ru.kata.spring.boot_security.demo.repositories.RolesRepository;

import java.util.List;
import java.util.Optional;

@Service
public class RolesServiceImpl implements RolesService {

    private final RolesRepository rolesRepository;


    public RolesServiceImpl(RolesRepository rolesRepository) {
        this.rolesRepository = rolesRepository;
    }
    @Override
    public List<Role> getAllRoles() {
        return rolesRepository.findAll();
    }

    @Override
    public Role getRole(String userRole) {
        return rolesRepository.findByRoleName(userRole);
    }

    @Override
    public Role getRoleById(int id) {
        Optional<Role> foundRole = rolesRepository.findById(id);
        return foundRole.orElse(null);
    }

    @Override
    public void addRole(Role role) {
        rolesRepository.save(role);
    }
}
