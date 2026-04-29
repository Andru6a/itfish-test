"use client";
import {useState} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {useRouter} from "next/navigation";
import {useStore} from "@/store/useStore";

const validationSchema = Yup.object().shape({
    login: Yup.string().min(3).max(15).required("Обязательное поле"),
    password: Yup.string().min(3).max(15).required("Обязательное поле"),
    repassword: Yup.string()
        .min(3)
        .max(15)
        .oneOf([Yup.ref("password")], "Пароли не совпадают")
        .required("Обязательное поле"),
});

const fieldClass =
    "p-2 bg-gray-900 text-amber-50 rounded-lg shadow shadow-cyan-300 placeholder:text-gray-400 outline-none";

const EyeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
    </svg>
);

const EyeOffIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
);

const Test_1 = () => {
    const router = useRouter();
    const setLogin = useStore((s) => s.setLogin);
    const [showPassword, setShowPassword] = useState(false);
    const [showRepassword, setShowRepassword] = useState(false);

    return (
        <div className="flex justify-center p-20">
            <Formik
                initialValues={{login: "", password: "", repassword: ""}}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    setLogin(values.login);
                    router.push("/test_2");
                }}
            >
                <Form className="flex flex-col items-center gap-4">
                    <div className="flex flex-col items-center  w-full">
                        <Field
                            name="login"
                            placeholder="Введите логин"
                            className={`${fieldClass} w-full`}
                        />
                        <ErrorMessage
                            name="login"
                            component="span"
                            className="text-red-500 text-sm mt-2"
                        />
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="relative flex items-center">
                            <Field
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Введите пароль"
                                className={`${fieldClass} pr-9`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                className="absolute right-2 text-gray-400 hover:text-amber-50"
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOffIcon/> : <EyeIcon/>}
                            </button>
                        </div>
                        <ErrorMessage
                            name="password"
                            component="span"
                            className="text-red-500 text-sm mt-2"
                        />
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="relative flex items-center">
                            <Field
                                name="repassword"
                                type={showRepassword ? "text" : "password"}
                                placeholder="Повторите пароль"
                                className={`${fieldClass} pr-9`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowRepassword((v) => !v)}
                                className="absolute right-2 text-gray-400 hover:text-amber-50"
                                tabIndex={-1}
                            >
                                {showRepassword ? <EyeOffIcon/> : <EyeIcon/>}
                            </button>
                        </div>
                        <ErrorMessage
                            name="repassword"
                            component="span"
                            className="text-red-500 text-sm mt-2"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-gray-900 text-amber-50 rounded-lg shadow shadow-cyan-300 px-4 py-2"
                    >
                        Отправить
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default Test_1;
