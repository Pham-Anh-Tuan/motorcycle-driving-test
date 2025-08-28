package com.example.backend.core.mapper;

import com.example.backend.core.response.SignRes;
import com.example.backend.userService.model.Sign;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

public class SignMapper {
    public static SignRes toSignRes(Sign sign) {
        SignRes res = new SignRes(
                sign.getId(),
                sign.getCode(),
                sign.getTitle(),
                sign.getImageName(),
                sign.getDescription()
        );
        return res;
    }

    public static List<SignRes> toSignResList(Page<Sign> signList) {
        return signList.stream().map(SignMapper::toSignRes).collect(Collectors.toList());
    }

    public static List<SignRes> toSignResList(List<Sign> signList) {
        return signList.stream().map(SignMapper::toSignRes).collect(Collectors.toList());
    }
}
