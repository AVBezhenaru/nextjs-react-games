import {FC} from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/form.module.scss";
import {useAppDispatch} from "../store/hooks";
import {fetchRegisterUser} from "../api/service";

type Inputs = {
    username: string,
    email: string,
    password: string,
};

const RegistrationForm:FC = () => {
    const { register, handleSubmit, watch, formState: { errors }, clearErrors } = useForm<Inputs>();
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<Inputs>  = (date) => {
        const user = {
            username: date.username,
            email: date.email,
            password: date.password,
        };
        clearErrors();
        dispatch(fetchRegisterUser({ user }));
    };

    return (
        <>
            <h1 className={styles.title}><Image src="/logo.png" width={120} height={120} />Gaming Registration Form</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <input className={styles.input}
                    placeholder="Username"
                    {...register('username', {
                        required: 'Required field',
                        minLength: {
                            value: 3,
                            message: 'At least 3 characters',
                        },
                        maxLength: {
                            value: 20,
                            message: 'Maximum 20 character',
                        },
                    })}
                />
                {errors?.username && <p className={styles.error}>{errors.username.message}</p>}

                <input className={styles.input}
                    placeholder="Some@example.com"
                    {...register('email', {
                        required: 'Required field',
                        pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: 'Type valid email',
                        },
                    })}
                />
                {errors?.email && <p className={styles.error}>{errors.email.message}</p>}

                <input className={styles.input}
                    type="password"
                    placeholder="Password"
                    {...register('password', {
                        required: 'You must specify a password',
                        minLength: {
                            value: 6,
                            message: 'Password must have at least 6 characters',
                        },
                        maxLength: {
                            value: 40,
                            message: 'Password must have maximum 40 characters',
                        },
                    })}
                />
                {errors.password && <p className={styles.error}>{errors.password.message}</p>}

                <input className={styles.input}
                    type="password"
                       placeholder="Repeat password"
                    {...register('password_repeat', {
                        validate: (value) => value === watch('password') || 'The passwords do not match',
                    })}
                />
                {errors.password_repeat && <p className={styles.error}>{errors.password_repeat.message}</p>}

                <input type="submit" value="Create" className={styles.button}/>
                <p className={styles.text}>Already have an account? <Link href={"/login"}><a className={styles.link}>Sign In.</a></Link></p>
            </form>

        </>
    );
}

export default RegistrationForm;
