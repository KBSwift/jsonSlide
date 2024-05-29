package ai.torch.service;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.inject.Singleton;
import org.apache.poi.xslf.usermodel.*;
import java.awt.geom.Rectangle2D;
import java.io.FileInputStream;
import java.util.*;

@Singleton
public class PowerPointService {

    private final ObjectMapper objectMapper = new ObjectMapper();

    public String convertPowerPointToJson(String filePath) {
        try (FileInputStream inputStream = new FileInputStream(filePath)) {
            XMLSlideShow ppt = new XMLSlideShow(inputStream);
            List<Map<String, Object>> slidesData = new ArrayList<>();

            // Iterating over each slide in case there are more in presentation
            for (XSLFSlide slide : ppt.getSlides()) {
                Map<String, Object> currentSlideData = new LinkedHashMap<>();
                currentSlideData.put("Title", slide.getTitle());

                // Extracting images
                List<Map<String, String>> images = new ArrayList<>();
                for (XSLFShape shape : slide.getShapes()) {
                    if (shape instanceof XSLFPictureShape) {
                        XSLFPictureShape picShape = (XSLFPictureShape) shape;
                        byte[] picBytes = picShape.getPictureData().getData();
                        String encodedImage = Base64.getEncoder().encodeToString(picBytes);
                        Map<String, String> imageInfo = new LinkedHashMap<>();
                        imageInfo.put("base64", encodedImage);

                        Rectangle2D anchor = picShape.getAnchor(); // Working with geometry to get properties
                        imageInfo.put("position", "x: " + anchor.getX() + ", y: " + anchor.getY());
                        imageInfo.put("width", String.valueOf(anchor.getWidth()));
                        imageInfo.put("height", String.valueOf(anchor.getHeight()));

                        images.add(imageInfo);
                    }
                }
                currentSlideData.put("Images", images);

                // Extracting and transforming text
                List<String> texts = new ArrayList<>();
                XSLFShape[] shapesArray = slide.getShapes().toArray(new XSLFShape[0]);
                List<XSLFShape> shapesList = Arrays.asList(shapesArray); // using type safety. Issues otherwise
                extractTextFromShapes(shapesList, texts);
                currentSlideData.put("Text", texts);

                // Extracting and transforming shapes and their properties
                List<Map<String, Object>> shapesInfo = new ArrayList<>();
                for (XSLFShape shape : slide.getShapes()) {

                    if (shape instanceof XSLFSimpleShape && !shape.getShapeName().isEmpty()) {  // Checking against empty objects
                        Map<String, Object> shapeInfo = new LinkedHashMap<>();
                        XSLFSimpleShape simpleShape = (XSLFSimpleShape) shape;
                        shapeInfo.put("shapeName", simpleShape.getShapeName());
                        Rectangle2D anchor = simpleShape.getAnchor();
                        shapeInfo.put("position", "x: " + anchor.getX() + ", y: " + anchor.getY());
                        shapeInfo.put("width", anchor.getWidth());
                        shapeInfo.put("height", anchor.getHeight());
                        shapesInfo.add(shapeInfo);

                        if (simpleShape instanceof XSLFAutoShape) {
                            XSLFAutoShape autoShape = (XSLFAutoShape) simpleShape;
                            shapeInfo.put("rotation", autoShape.getRotation());
                            shapeInfo.put("flippedHorizontally", autoShape.getFlipHorizontal());
                            shapeInfo.put("flippedVertically", autoShape.getFlipVertical());
                        }
                    }

                }
                currentSlideData.put("Shapes", shapesInfo);

                slidesData.add(currentSlideData);
//                String json = objectMapper.writeValueAsString(slidesData); // refactored and decided against this

            }

            return objectMapper.writeValueAsString(slidesData); // Convert the list of slide data to JSON string
        } catch (Exception e) {
            e.printStackTrace();
            return "Error processing file: " + e.getMessage(); // Handle possible errors
        }
    }

    private void extractTextFromShapes(List<XSLFShape> shapes, List<String> texts) {
        for (XSLFShape shape : shapes) {
            if (shape instanceof XSLFTextShape) {
                XSLFTextShape textShape = (XSLFTextShape) shape;
                StringBuilder sb = new StringBuilder();
                for (XSLFTextParagraph paragraph : textShape.getTextParagraphs()) {
                    for (XSLFTextRun run : paragraph.getTextRuns()) {
                        sb.append(run.getRawText());
                    }
                }
                texts.add(sb.toString());
            } else if (shape instanceof XSLFGroupShape) {
                // Recursively extracting text from grouped shapes
                extractTextFromShapes(((XSLFGroupShape) shape).getShapes(), texts);
            }
        }
    }

}