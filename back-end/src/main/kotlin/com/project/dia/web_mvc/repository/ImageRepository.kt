package com.project.dia.web_mvc.repository

import com.project.dia.web_mvc.Model.Entity.ImageEntity
import org.springframework.data.jpa.repository.JpaRepository

interface ImageRepository : JpaRepository<ImageEntity, Long> {
    fun findAllImageModelByUserEmail(id: String?): MutableList<ImageEntity>
    fun findImageEntitiesById(id: Long): ImageEntity

}