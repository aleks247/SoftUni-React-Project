import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Profile.module.css";

export default function Profile() {
    const { user, userUpdate } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "Loading..",
        email: "Loading..",
        phone: "Loading..",
        address: "Loading..",
        city: "Loading..",
        zip: "Loading..",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.name || "Peter Pan",
                email: user.email || "",
                phone: user.phone || "N/A",
                address: user.address || "N/A",
                city: user.city || "N/A",
                zip: user.zip || "N/A",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await request.put(
                `http://localhost:3030/jsonstore/users/${user._id}`,
                formData
            );

            userUpdate(formData);

            setIsEditing(false);
            alert("Profile updated!");
        } catch (error) {
            console.log(error);
            alert("Could not update profile.");
        }

        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <div className={styles["container"]}>
            <aside className={styles["sidebar"]}>
                <div className={styles["avatarWrapper"]}>
                    <img
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=500&q=80"
                        alt="Profile"
                        className={styles["avatar"]}
                    />
                </div>
                <h2 className={styles["userName"]}>{formData.fullName}</h2>
                <span className={styles["userRole"]}>
                    {localStorage.getItem("role")}
                </span>
            </aside>

            <div className={styles["details"]}>
                <div className={styles["header"]}>
                    <h1 className={styles["title"]}>Profile Settings</h1>
                    {!isEditing && (
                        <button
                            className={styles["editBtn"]}
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Profile
                        </button>
                    )}
                </div>

                <form className={styles["grid"]} onSubmit={handleSave}>
                    <div
                        className={`${styles["group"]} ${styles["fullWidth"]}`}
                    >
                        <label className={styles["label"]}>Full Name</label>
                        <input
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={styles["input"]}
                        />
                    </div>

                    <div
                        className={`${styles["group"]} ${styles["fullWidth"]}`}
                    >
                        <label className={styles["label"]}>Email Address</label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={styles["input"]}
                        />
                    </div>

                    <div className={styles["group"]}>
                        <label className={styles["label"]}>Phone Number</label>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={styles["input"]}
                        />
                    </div>

                    <div className={styles["group"]}>
                        <label className={styles["label"]}>City</label>
                        <input
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={styles["input"]}
                        />
                    </div>

                    <div
                        className={`${styles["group"]} ${styles["fullWidth"]}`}
                    >
                        <label className={styles["label"]}>
                            Shipping Address
                        </label>
                        <input
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={styles["input"]}
                        />
                    </div>

                    {isEditing && (
                        <div className={styles["actions"]}>
                            <button type="submit" className={styles["saveBtn"]}>
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className={styles["cancelBtn"]}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
