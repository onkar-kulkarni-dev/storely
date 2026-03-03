import styles from './MyProfile.module.scss';
import { LuPencil } from "react-icons/lu";
import { VscAccount } from "react-icons/vsc";
import { useState, useEffect } from 'react';
import { CiUser } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { BsBoxSeam } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlinePayment } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

const MyProfile = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm({
        mode: "onChange",
        reValidateMode: "onChange",
        shouldUnregister: true,
    });

    const [name, setName] = useState('Johnathan Doe')
    const [email, setEmail] = useState('john.doe@example.com')
    const [isEditBtnClicked, setIsEditBtnClicked] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('9912231215')
    const [selectedGender, setSelectedGender] = useState('male')
    const [dob, setDob] = useState('20-02-1998')

    const watchedGender = watch('gender');
    const currentGender = watchedGender || selectedGender;

    useEffect(() => {
        if (isEditBtnClicked) {
            reset({
                fullName: name,
                email,
                phoneNumber,
                dob,
                gender: selectedGender,
            });
        }
    }, [isEditBtnClicked, name, email, phoneNumber, dob, selectedGender, reset]);


    const handleUpdateData = () => {
        handleSubmit(onSubmit)();
    }

    const onSubmit = (data: any) => {
        setName(data.fullName);
        setEmail(data.email);
        setPhoneNumber(data.phoneNumber.replace(/^\+91\s*/u, ""));
        setSelectedGender(data.gender);
        setDob(data.dob);
        setIsEditBtnClicked(false);
    }

    return (
        <div className={styles.container}>
            <p className={styles.settings}>Settings</p>
            <h2>Account Settings</h2>
            <p className={styles.subTitle}>Manage your personal details, preferences, and security settings to keep your account safe.</p>
            <div className={styles.profileDetails}>
                <div className={styles.leftSide}>
                    <div className={styles.profileImgContainer}>
                        <VscAccount size={80} className={styles.profileIcon} />
                        <button className={styles.editImage}><LuPencil /></button>
                    </div>
                    <div>
                        <p className={styles.name}>{name}</p>
                        <p className={styles.email}>{email}</p>
                        <div className={styles.tagContainer}>
                            <p className={styles.verifiedAccount}>verified account</p>
                            <p className={styles.proMember}>pro member</p>
                        </div>
                    </div>
                </div>
                {!isEditBtnClicked ? <button className={styles.editProfileBtn} onClick={() => setIsEditBtnClicked(true)}><LuPencil />edit profile</button> : null}
            </div>
            <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)} >
                <div>
                    <label>full name</label>
                    <div className={styles.inputBox}>
                        <input
                            type='text'
                            placeholder='Enter your name'
                            {...register('fullName', { required: 'Full name is required' })}
                            defaultValue={name}
                            disabled={!isEditBtnClicked}
                            className={isEditBtnClicked ? styles.input : styles.disabledInput}
                        />
                        <CiUser className={isEditBtnClicked ? styles.editIcon : styles.icon} />
                    </div>
                    {errors.fullName && <span className={styles.error}>{errors.fullName.message as string}</span>}
                    <label>eamil address</label>
                    <div className={styles.inputBox}>
                        <input
                            type='email'
                            placeholder='Enter your email address'
                            {...register('email', {
                                required: 'Email address is required',
                                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' }
                            })}
                            defaultValue={email}
                            disabled={!isEditBtnClicked}
                            className={isEditBtnClicked ? styles.input : styles.disabledInput}
                        />
                        <CiMail className={isEditBtnClicked ? styles.editIcon : styles.icon} />
                    </div>
                    {errors.email && <span className={styles.error}>{errors.email.message as string}</span>}
                    <label>phone number</label>
                    <div className={styles.inputBox}>
                        <input
                            type='text'
                            placeholder='Enter your phone number'
                            {...register('phoneNumber', { required: 'Phone number is required' })}
                            defaultValue={`+91 ${phoneNumber}`}
                            disabled={!isEditBtnClicked}
                            className={isEditBtnClicked ? styles.input : styles.disabledInput}
                        />
                        <IoCallOutline className={isEditBtnClicked ? styles.editIcon : styles.icon} />
                    </div>
                    {errors.phoneNumber && <span className={styles.error}>{errors.phoneNumber.message as string}</span>}
                </div>
                <div>
                    <label>date of birth</label>
                    <div className={styles.inputBox}>
                        <input
                            type='text'
                            placeholder='dd-mm-yyyy'
                            {...register('dob', {
                                required: 'Date of birth is required',
                                validate: (val) => {
                                    if (!val) return 'Date of birth is required';
                                    const regex = /^\d{2}-\d{2}-\d{4}$/;
                                    return regex.test(val) || 'Invalid date format';
                                }
                            })}
                            defaultValue={dob}
                            disabled={!isEditBtnClicked}
                            className={isEditBtnClicked ? styles.input : styles.disabledInput}
                        />
                        <CiCalendarDate className={isEditBtnClicked ? styles.editIcon : styles.icon} />
                    </div>
                    {errors.dob && <span className={styles.error}>{errors.dob.message as string}</span>}
                    <p className={styles.label}>gender</p>
                    <div className={styles.radioContainer}>
                        <label>
                            <input
                                type='radio'
                                value='male'
                                {...register('gender', { required: 'Gender is required' })}
                                checked={currentGender === 'male'}
                                disabled={!isEditBtnClicked}
                            />
                            Male
                        </label>
                        <label>
                            <input
                                type='radio'
                                value='female'
                                {...register('gender', { required: 'Gender is required' })}
                                checked={currentGender === 'female'}
                                disabled={!isEditBtnClicked}
                            />
                            Female
                        </label>
                        <label>
                            <input
                                type='radio'
                                value='other'
                                {...register('gender', { required: 'Gender is required' })}
                                checked={currentGender === 'other'}
                                disabled={!isEditBtnClicked}
                            />
                            Other
                        </label>
                    </div>
                    {errors.gender && <span className={styles.error}>{errors.gender.message as string}</span>}
                </div>
            </form>
            {isEditBtnClicked ? <>
                <div className={styles.hrLine}></div>
                <div className={styles.btnContainer}>
                    <button className={styles.cancelBtn} onClick={() => {
                        setIsEditBtnClicked(false);
                        reset();
                    }}>Cancel</button>
                    <button className={styles.saveChangesBtn} type='button' onClick={handleUpdateData}>Save Changes</button>
                </div>
            </>
                : null
            }
            <h3>Quick Links</h3>
            <ul className={styles.footerLinkContainer}>
                <Link to="/orders"><li><BsBoxSeam size={20}/>My Orders</li></Link>
                <Link to="/wishlist"><li><CiHeart size={20}/>Wishlist</li></Link>
                <Link to=""><li><CiLocationOn size={20}/>Address Book</li></Link>
                <Link to=""><li><MdOutlinePayment size={20}/>Payment Methods</li></Link>
                <Link to=""><li><IoSettingsOutline size={20}/>Account Settings</li></Link>
                <div className={styles.hrLine}></div>
                <Link to="/auth"><li className={styles.logout}><IoIosLogOut size={20}/>Logout</li></Link>
            </ul>
        </div>
    )
}

export default MyProfile