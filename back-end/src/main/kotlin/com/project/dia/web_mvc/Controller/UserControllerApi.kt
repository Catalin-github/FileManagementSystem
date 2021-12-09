package com.project.dia.web_mvc.Controller

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier
import com.google.api.client.http.javanet.NetHttpTransport
import com.google.api.client.json.jackson2.JacksonFactory
import com.project.dia.web_mvc.Model.Model_Request.*
import com.project.dia.web_mvc.Model.Model_Response.ModelResponse
import com.project.dia.web_mvc.Model.Model_Response.UserSuccess
import com.project.dia.web_mvc.Service.UserService
import com.project.dia.web_mvc.constants.SecurityKey
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.ApplicationEventPublisher
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@RestController
@RequestMapping("/api")
class UserControllerApi(@Autowired val authenticationManager: AuthenticationManager) {

    @Autowired
    private lateinit var eventPublisher: ApplicationEventPublisher

    @Autowired
    lateinit var userService: UserService

    var securityKey: SecurityKey = SecurityKey()

    @PostMapping("/user/google")//
    fun loginGoogle(@RequestBody googleModel: GoogleModel, response: HttpServletResponse): ModelResponse {
        try {
            val transport = NetHttpTransport()
            val jacksonFactory: JacksonFactory = JacksonFactory.getDefaultInstance()
            val verifier: GoogleIdTokenVerifier.Builder = GoogleIdTokenVerifier.Builder(transport, jacksonFactory)
                .setAudience(listOf(securityKey.getGoogleId()))
            val googleIdToken: GoogleIdToken = GoogleIdToken.parse(verifier.jsonFactory, googleModel.token)
            val payload: GoogleIdToken.Payload = googleIdToken.payload
            println(payload)

            return userService.registerWithGoogle(
                GoogleModel(
                    email = payload["email"] as String,
                    firstName = payload["given_name"] as String?,
                    lastName = payload["family_name"] as String?,
                    phone = payload["phone"] as String?,
                    token = googleModel.token,
                    picture = payload["picture"] as String?
                ), response
            )
        } catch (error: BadCredentialsException) {
            return ModelResponse(success = false, message = "Google authentication failed", null)
        }
    }

    @PostMapping("/user/register")
    fun registerUser(@RequestBody registerData: RegisterModel, response: HttpServletResponse): ModelResponse {
        println("you in REGISTER")
        return userService.saveUser(registerData, response)
    }

    @PostMapping("/user/login")
    fun loginUser(
        request: HttpServletRequest,
        response: HttpServletResponse,
        authentication: Authentication
    ): ModelResponse {

        val user = userService.findUserByEmail(authentication.name)
        user.login = securityKey.BASIC
        userService.updateUserData(user)
        return ModelResponse(
            success = true, message = "Successful authenticated!",
            dataUserResponse = UserSuccess(firstName = user.firstName, email = user.email, account_type = user.login)
        )
    }

    @GetMapping("/user/accountConfirm")
    fun getUsers(@RequestParam(value = "token") token: String): ModelResponse {
        println("token")
        return userService.validateEmailToken(token)
    }

    @PostMapping("/user/update")
    fun updateUser(@RequestBody updateDataModel: UpdateDataModel, authentication: Authentication): ModelResponse {
        println("this is update")
        println(updateDataModel.email)
        return userService.updateUser(updateDataModel)

    }

    @PostMapping("/user/account")
    fun accountData(request: HttpServletRequest, authentication: Authentication): ModelResponse {
        println(authentication.name)
        println("accountt")

        return userService.accountData(authentication.name)

    }

    @PostMapping("/user/request-reset-password")
    fun requestResetPassword(@RequestBody passwordModel: PasswordModel): ModelResponse {
        println(passwordModel.email)
        return userService.requestResetPassword(passwordModel.email)
    }

    @PostMapping("/user/reset-password")
    fun resetPassword(
        @RequestParam(value = "token") token: String,
        @RequestBody passwordResetPasswordModel: PasswordResetModel
    ): ModelResponse {
        return userService.resetPassword(token, passwordResetPasswordModel.password)
    }

    @GetMapping("/user/isAuthenticated")
    fun authenticateUser(
        request: HttpServletRequest,
        response: HttpServletResponse,
        authentication: Authentication
    ): ModelResponse {
        return userService.findUserByEmailAndSendResponse(authentication.name, response)
    }

    @GetMapping("/user/image")
    fun getImages(@RequestParam(value = "id") id: String): MutableList<FileModel>? {
        return userService.findAllImage(id)
    }

    @PostMapping("/user/image/upload")
    fun uploadImages(
        @RequestParam(value = "email") email: String,
        @RequestBody files:MutableList<FileModel>
        ): Boolean {
        return userService.uploadAllImage(email,files)
    }

    @DeleteMapping("/user/remove/image")
    fun deleteImages(@RequestParam(value = "id") id: Long): Boolean {
        return userService.removeImage(id)

    }


    @GetMapping("/user/video")
    fun getVideo(@RequestParam(value = "id") id: String): MutableList<FileModel>? {
        return userService.findAllVideo(id)
    }

    @PostMapping("/user/video/upload")
    fun uploadVideo(
        @RequestParam(value = "email") email: String,
        @RequestBody files:MutableList<FileModel>
    ): Boolean {
        return userService.uploadAllVideo(email,files)
    }

    @DeleteMapping("/user/remove/video")
    fun deleteVideo(@RequestParam(value = "id") id: Long): Boolean {
        return userService.removeVideo(id)

    }













    @GetMapping("/user/logout")
    fun logout(request: HttpServletRequest, response: HttpServletResponse): ModelResponse {
        val authCookie = Cookie(securityKey.HEADER_NAME, null)
        authCookie.isHttpOnly = true
        authCookie.maxAge = 0
        authCookie.path = "/"
        response.addCookie(authCookie)
        return ModelResponse(success = true, message = "You logout succesfully!", null)
    }


}
