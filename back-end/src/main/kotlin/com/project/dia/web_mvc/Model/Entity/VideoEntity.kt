package com.project.dia.web_mvc.Model.Entity

import javax.persistence.*
@Entity
@Table(name = "videos")
class VideoEntity (
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long=0,
    var name:String?=null,
    var type:String?=null,
    @Lob
    var data:String?=null,

    @JoinColumn(name = "id_usr", referencedColumnName = "id")
    @ManyToOne
    var users: UserEntity? = null,

)