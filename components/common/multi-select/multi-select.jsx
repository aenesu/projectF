"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./multi-select.module.scss";

const handleClickOutside = (event, ref, callback) => {
    if (ref.current && !ref.current.contains(event.target)) {
        callback(false);
    }
};

const toggleItemSelection = (itemValue, callback) => {
    callback((prevSelectedItems) => {
        if (prevSelectedItems.includes(itemValue))
            return prevSelectedItems.filter(
                (prevSelectedItem) => prevSelectedItem !== itemValue
            );
        else return [...prevSelectedItems, itemValue];
    });
};

export default function MultiSelect({ data, defaultValues, name, title }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [selectedItems, setSelectedItems] = useState(
        defaultValues ? defaultValues.map((item) => item.value) : []
    );

    useEffect(() => {
        document.addEventListener("mousedown", (e) =>
            handleClickOutside(e, dropdownRef, setIsDropdownOpen)
        );

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <fieldset className={styles.dropdown} ref={dropdownRef}>
            <input type="hidden" name={name} value={selectedItems} />
            <button
                className={styles.button}
                type="button"
                title={`Select ${title}`}
                onClick={() => setIsDropdownOpen((prev) => !prev)}>
                {selectedItems.length > 0
                    ? `${selectedItems.length} ${title} selected`
                    : `Select ${title}`}
            </button>

            {isDropdownOpen && (
                <div className={styles.panel}>
                    {data.map((item) => (
                        <fieldset
                            key={item.value}
                            className={styles.inputGroup}>
                            <input
                                type="checkbox"
                                id={item.value}
                                checked={selectedItems.includes(item.value)}
                                onChange={() =>
                                    toggleItemSelection(
                                        item.value,
                                        setSelectedItems
                                    )
                                }
                            />
                            <label htmlFor={item.value} title={item.label}>
                                {item.label}
                            </label>
                        </fieldset>
                    ))}
                </div>
            )}
        </fieldset>
    );
}
