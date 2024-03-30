import { Carousel } from 'antd';
import img from "../Assets/images/Mortal Kombat.jpg"
import { Link } from 'react-router-dom';
export const Kinoportal = () => {
    return (
        <>
            <main>
                <section>
                    <div className="container">
                       <h2 id='text' className='text-center mt-4 text-success !'>KinoPortal Haqida</h2>
                        <div>
                            <Carousel className='my-5 w-100 ' autoplay>
                                <div>
                                    <img className='rounded' style={{width:"1257px", height:"560px"}} src={img} alt="" />
                                </div>
                                <div>
                                    <img className='rounded' style={{width:"1257px", height:"560px"}} src={img} alt="" />
                                </div>
                                <div>
                                    <img className='rounded' style={{width:"1257px", height:"560px"}} src={img} alt="" />
                                </div>
                                <div>
                                    <img className='rounded' style={{width:"1257px", height:"560px"}} src={img} alt="" />
                                </div>
                            </Carousel>
                        </div>
                                <h1 className='text-success text-center my-5'> Kinoportal Haqida Qisqacha !</h1>
                        <div>
                            <h2 className='mb-5' style={{textAlign:"center",letterSpacing:"1px"}}>Kinoportalga hush kelibsiz . Bu kinopotalda turli davlatlarning kinolarini va ular haqidagi malumotlarni topishingiz mumkin . Bu kinoportal apisida  axios  va Context <br /> Texnologiyalaridan foydalanilgan . Kinoportaldan foydalanish uchun  avval <br /> <Link to={"/register"} className='text-danger'>
                             Ruyhatdan Uting</Link>. Eslatib Utaman Bu Kinoportal Bir Kishi Tomonidan Yasalgan va Kinoportal Malumotlari <span className='text-danger'>TMDB</span> Saytidan Olingan Xatoliklar Uchun Uzur </h2>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}