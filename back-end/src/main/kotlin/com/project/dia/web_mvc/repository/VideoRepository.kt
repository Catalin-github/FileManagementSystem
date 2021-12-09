package com.project.dia.web_mvc.repository

import com.project.dia.web_mvc.Model.Entity.VideoEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface VideoRepository:JpaRepository<VideoEntity,Long> {
    fun findAllVideoModelByUsersEmail(id: String?): MutableList<VideoEntity>
    fun findVideoEntitiesById(id: Long): VideoEntity

}