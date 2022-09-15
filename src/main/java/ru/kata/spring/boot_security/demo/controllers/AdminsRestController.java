package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.RolesService;
import ru.kata.spring.boot_security.demo.services.UsersService;

import java.security.Principal;
import java.util.List;



@RestController
@RequestMapping("/api")
public class AdminsRestController {

    private final RolesService rolesService;
    private final UsersService usersService;

    @Autowired
    public AdminsRestController(RolesService rolesService, UsersService usersService) {
        this.rolesService = rolesService;
        this.usersService = usersService;
    }

    @GetMapping("/admin")
    public ResponseEntity<List<User>> showAdminPage() {
        return new ResponseEntity<>(usersService.findAll(), HttpStatus.OK);
    }

    @PostMapping("/admin")
    public ResponseEntity<Void> createUser(@RequestBody User user) {
        usersService.save(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/admin/{id}")
    public ResponseEntity<Void> updateUser(@RequestBody User user, @PathVariable int id) {
        if (user.getPassword().equals("")) {
            user.setPassword(usersService.findOne(id).getPassword());
        }
        if (user.getRoles().size() == 0) {
            user.setRoles(usersService.findOne(id).getRoles());
        }
        usersService.update(id, user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
        usersService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/header")
    public ResponseEntity<User> getAuthentication(Principal principal) {
        User user = usersService.findByLogin(principal.getName());
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    @GetMapping("/roles")
    public ResponseEntity<List<Role>> getAllRoles() {
        return new ResponseEntity<>(rolesService.getAllRoles(), HttpStatus.OK);
    }
}
