"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./multi-select.module.scss";

export default function MultiSelect({ data, defaultValues, name, title }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [selectedItems, setSelectedItems] = useState(
        defaultValues ? defaultValues.map((item) => item.value) : []
    );

    useEffect(() => {}, []);

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
