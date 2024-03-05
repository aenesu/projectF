import Swal from "sweetalert2";

export const swalToast = (title, icon = "info", timer = 4000) => {
    return Swal.fire({
        icon,
        title,
        timer,
        showConfirmButton: false,
    });
};
