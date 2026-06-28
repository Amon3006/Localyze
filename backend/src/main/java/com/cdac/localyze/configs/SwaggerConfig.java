package com.cdac.localyze.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {

        return new OpenAPI()

                .info(new Info()

                        .title("Localyze API")

                        .version("1.0")

                        .description("Hyperlocal Business Discovery Platform"))

                .externalDocs(new ExternalDocumentation()

                        .description("Project Documentation"));

    }

}