package com.example.backend.core.mapper;

import com.example.backend.core.response.ManagerNewsRes;
import com.example.backend.core.response.UpdatedNewsRes;
import com.example.backend.userService.model.News;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

public class NewsMapper {
    public static ManagerNewsRes toManagerNewsRes(News news) {
        ManagerNewsRes res = new ManagerNewsRes(
                news.getId(),
                news.getTitle(),
                news.getThumbnailName(),
                news.getCreatedAt()
        );
        return res;
    }

    public static UpdatedNewsRes toUpdatedNewsRes(News news) {
        UpdatedNewsRes res = new UpdatedNewsRes(
                news.getTitle(),
                news.getThumbnailName(),
                news.getContent()
        );
        return res;
    }


    public static List<ManagerNewsRes> toManagerNewsResList(Page<News> newsPage) {
        return newsPage.stream().map(NewsMapper::toManagerNewsRes).collect(Collectors.toList());
    }


}
