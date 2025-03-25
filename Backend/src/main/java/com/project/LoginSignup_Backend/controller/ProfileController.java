package com.project.LoginSignup_Backend.controller;


import com.project.LoginSignup_Backend.model.UserEntity;
import com.project.LoginSignup_Backend.model.UserProfile;
import com.project.LoginSignup_Backend.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("*")
@RestController
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @GetMapping("")
    public ResponseEntity<UserEntity> getCurrentUser() {
        UserEntity user = profileService.find();
        if(user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(user);
    }

    @GetMapping("/entry")
    public ResponseEntity<?> getProfile() {
        UserEntity user = profileService.find();
        if (!user.isProfileCompleted()) {
            return ResponseEntity.badRequest().body("Not Created");
        }
        UserProfile profile = profileService.getProfile(user.getId());
        return new ResponseEntity<>(profile,HttpStatus.OK);
    }


    @PostMapping("")
    public ResponseEntity<?> completeProfile(@RequestBody UserProfile userProfile) {

        UserEntity user = profileService.find();

        if (user.isProfileCompleted()) {
            return ResponseEntity.badRequest().body("Profile already completed");
        }

        UserProfile profile = profileService.completeProfile(user, userProfile);
        return ResponseEntity.ok(profile);
    }

}
