package com.team48.inscriptionscolaire.admin;

import com.team48.inscriptionscolaire.common.BaseEntity;
import com.team48.inscriptionscolaire.user.User;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
//@AllArgsConstructor
@DiscriminatorValue("ADMIN")
public class Admin extends User {
}
