package com.project.LoginSignup_Backend.service;


import com.project.LoginSignup_Backend.model.UserEntity;
import com.project.LoginSignup_Backend.model.UserProfile;
import com.project.LoginSignup_Backend.repository.UserProfileRepository;
import com.project.LoginSignup_Backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileService {

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public UserProfile completeProfile(UserEntity users, UserProfile request) {
        if (users.isProfileCompleted()) {
            throw new IllegalStateException("Profile already completed");
        }
        UserProfile profile = new UserProfile();
        profile.setUser(users);
        profile.setFirstName(request.getFirstName());
        profile.setLastName(request.getLastName());
        profile.setBio(request.getBio());
        profile.setRole(request.getRole());

        users.setProfileCompleted(true);
        userRepository.save(users);

        return userProfileRepository.save(profile);
    }

    public UserEntity find() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsernameOrEmail(username).orElse(null);
    }

    public UserProfile getProfile(Long id) {
        UserProfile profile = userProfileRepository.findById(id).get();
        return profile;
    }
}
