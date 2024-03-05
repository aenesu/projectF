import Sidebar from "@/components/common/sidebar/sidebar";
import Breadcrumb from "@/components/common/breadcrumb/breadcrumb";
import styles from "./layout.module.scss";


export default function ProtectedLayout({ children }) {
    return (
        <div className={styles.layoutContainer}>
            <Sidebar />
            <div className={styles.layoutContent}>
                <header>
                    <Breadcrumb />
                </header>
                {children}
            </div>
        </div>
    );
}
