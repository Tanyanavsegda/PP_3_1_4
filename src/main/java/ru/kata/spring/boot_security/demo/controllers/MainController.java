package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security.demo.services.RolesService;
import ru.kata.spring.boot_security.demo.services.UsersService;

@Controller
@RequestMapping(value = "/")
public class MainController {
    private final UsersService usersService;
    private final RolesService rolesService;

    @Autowired
    public MainController(UsersService usersService, RolesService rolesService) {
        this.usersService = usersService;
        this.rolesService = rolesService;
    }

    @GetMapping(value = "/admin")
    public String admPage() {
        return "/admin/admin";
    }

    @GetMapping("login")
    public String login() {
        return "/login";
    }

    @PostMapping("/admin/new")
    public String addNewUser() {
        return "redirect:/admin/admin";
    }

    @GetMapping("/user")
    public String userPage() {
        return "/user/user";
    }

}

