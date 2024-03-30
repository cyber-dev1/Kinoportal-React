import axios from "axios"
import { useFormik } from "formik"
import * as Yup from "yup"
export const Register = () => {
    var date = new Date()
    const initialValues = {
        username : "",
        email : "",
        password : "",
    }
    const validationSchema = Yup.object({
        username : Yup.string().required("Username kiritish majburiy").min(2, "Username 2 ta dan kup bulsin").max(14, "Username 14 ta dan oshmasin").matches(/^[a-zA-Z]+$/ , "Usernamega faqat harflar ishlat"),
        email : Yup.string().required("Email kiritish majburiy").email("Email hato tug'irla"),
        password : Yup.string().required("Password kiritish majburiy").min(4, "Password 4 ta dan kup bulsin").max(10, "Password 10 ta dan oshmasin")
    })
    const handleSub = async (event) => {
        event.preventDefault()
        const {username, email, password} = formik.values
        try {
            const request = await axios.post(`http://localhost:5555/users`, {
                name: username ,
                email : email ,
                password : password ,
                create : `${date.getHours()} : ${date.getMinutes()} : ${date.getDate()} : ${date.getDay()} create At `
            })
            if(request.status === 200 || request.status === 201){
                const response = await request.data
                console.log(response);
                if(response){
                    window.localStorage.setItem("token", response.accessToken)
                    window.localStorage.setItem("user", JSON.stringify(response.user))
                    window.location.href = "/";
                    alert("account successFully")

                }
            }
        } catch (error) {
            console.log(error)
            alert("account error Defined")
        }
    }
    const formik = useFormik({initialValues,validationSchema,handleSub})
    return (
        <>
           <div className="mt-3">
                <form onSubmit={handleSub}>
                    <h1 className="text-center my-5">Ruyhatdan Utish</h1>
                    <input className="my-3 mx-auto w-25 form-control" type="text" placeholder="Username" {...formik.getFieldProps("username")} />
                    {formik.touched.username && formik.errors.username && (
                        <p className="text-center text-danger">{formik.errors.username}</p>
                    )}
                    <input className="my-3 mx-auto form-control w-25" type="text" placeholder="@ Email" {...formik.getFieldProps("email")} />
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-center text-danger">{formik.errors.email}</p>
                    )}
                    <input className="my-3 mx-auto password form-control w-25" type="text" placeholder="Password" {...formik.getFieldProps("password")} />
                    {formik.touched.password &&  formik.errors.password && (
                        <p className="text-center text-danger">{formik.errors.password}</p>
                    )}
                    <button style={{marginLeft:"555px"}} className="btn btn-primary w-25">Ruyhatdan Utish</button>
                </form>
           </div>
        </>
    )
}