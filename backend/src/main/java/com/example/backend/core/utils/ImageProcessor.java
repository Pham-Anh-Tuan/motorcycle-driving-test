package com.example.backend.core.utils;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.util.Base64;

public class ImageProcessor {
    public static String processBase64Images(String htmlContent, String outputDir, String baseUrl) throws Exception {
        Document doc = Jsoup.parse(htmlContent);
        Elements imgs = doc.select("img[src^=data:image]");

        int index = 1;
        for (Element img : imgs) {
            String src = img.attr("src");

            // Tách phần base64
            String base64Data = src.split(",")[1];
            String mimeType = src.substring(5, src.indexOf(";")); // e.g., image/png
            String extension = mimeType.split("/")[1]; // png, jpeg, etc.

            // Tạo tên file
            String fileName = "image-" + System.currentTimeMillis() + "-" + index + "." + extension;
            File outputFile = new File(outputDir + File.separator + fileName);

            // Giải mã và lưu
            byte[] imageBytes = Base64.getDecoder().decode(base64Data);
            Files.createDirectories(outputFile.getParentFile().toPath());
            try (FileOutputStream fos = new FileOutputStream(outputFile)) {
                fos.write(imageBytes);
            }

            // Cập nhật src (dùng baseUrl để thay bằng biểu thức tạm thời)
            img.attr("src", baseUrl + fileName);
            index++;
        }

        return doc.body().html(); // return nội dung HTML đã thay đổi
    }
}
