import { MdSpaceDashboard } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { PiNotebookFill } from "react-icons/pi";
import { MdGrading } from "react-icons/md";
import { FaHandshakeAngle } from "react-icons/fa6";
import {
    MdAssistant,
    MdPlayLesson,
    MdOutlineViewTimeline,
} from "react-icons/md";
import { GrUserManager } from "react-icons/gr";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { FaPeopleLine } from "react-icons/fa6";
import { TiMessages } from "react-icons/ti";
import { GiNotebook } from "react-icons/gi";
import { AiOutlineSchedule } from "react-icons/ai";
import { BiSolidSelectMultiple } from "react-icons/bi";

/**
 * Sidebar data
 * @type {Array}
 * @property {string} _id - Unique id
 * @property {JSX.Element} icon - Icon
 * @property {string} pathname - Pathname
 * @property {Array} roles - Roles
 * @property {string} title - Title
 * @example
 * [
 *    {
 *       _id: "1",
 *      icon: <MdSpaceDashboard size={30} />,
 *     pathname: "/dashboard",
 *    roles:
 *     ["ADMIN", "MANAGER", "ASSISTANTMANAGER", "TEACHER", "STUDENT"],
 *    title: "Dashboard",
 *    }
 * ]
 */

export const sidebarData = [
    {
        _id: "1",
        icon: <MdSpaceDashboard size={30} />,
        pathname: "/dashboard",
        roles: ["ADMIN", "MANAGER", "ASSISTANTMANAGER", "TEACHER", "STUDENT"],
        title: "Dashboard",
    },
    {
        _id: "2",
        icon: <RiAdminFill size={30} />,
        pathname: "/dashboard/manage/admin",
        roles: ["ADMIN"],
        title: "Admins",
    },
    {
        _id: "3",
        icon: <GrUserManager size={30} />,
        pathname: "/dashboard/manage/manager",
        roles: ["ADMIN"],
        title: "Managers",
    },
    {
        _id: "4",
        icon: <MdAssistant size={30} />,
        pathname: "/dashboard/manage/assistant-manager",
        roles: ["ADMIN", "MANAGER"],
        title: "Assistant Managers",
    },
    {
        _id: "5",
        icon: <FaChalkboardTeacher size={30} />,
        pathname: "/dashboard/manage/teacher",
        roles: ["ADMIN", "ASSISTANTMANAGER"],
        title: "Teachers",
    },
    {
        _id: "6",
        icon: <PiNotebookFill size={30} />,
        pathname: "/dashboard/manage/lesson",
        roles: ["ADMIN", "ASSISTANTMANAGER"],
        title: "Lessons",
    },
    {
        _id: "7",
        icon: <MdOutlineViewTimeline size={30} />,
        pathname: "/dashboard/manage/lesson-program",
        roles: ["ADMIN", "ASSISTANTMANAGER"],
        title: "Lesson Programs",
    },
    {
        _id: "8",
        icon: <AiOutlineSchedule size={30} />,
        pathname: "/dashboard/manage/education-term",
        roles: ["ADMIN", "ASSISTANTMANAGER"],
        title: "Education Terms",
    },
    {
        _id: "9",
        icon: <PiStudentFill size={30} />,
        pathname: "/dashboard/manage/student",
        roles: ["ADMIN", "ASSISTANTMANAGER"],
        title: "Students",
    },
    {
        _id: "10",
        icon: <GiNotebook size={30} />,
        pathname: "/dashboard/manage/student-information",
        roles: ["TEACHER"],
        title: "Student Information",
    },
    {
        _id: "11",
        icon: <FaPeopleLine size={30} />,
        pathname: "/dashboard/manage/meeting",
        roles: ["TEACHER"],
        title: "Meetings",
    },
    {
        _id: "12",
        icon: <TiMessages size={30} />,
        pathname: "/dashboard/manage/message",
        roles: ["ADMIN", "MANAGER", "ASSISTANTMANAGER"],
        title: "Messages",
    },
    {
        _id: "13",
        icon: <MdPlayLesson size={30} />,
        pathname: "/dashboard/lessons",
        roles: ["STUDENT"],
        title: "Lessons",
    },
    {
        _id: "14",
        icon: <MdGrading size={30} />,
        pathname: "/dashboard/grades",
        roles: ["STUDENT"],
        title: "Grades",
    },
    {
        _id: "15",
        icon: <FaHandshakeAngle size={30} />,
        pathname: "/dashboard/meetings",
        title: "Meetings",
        roles: ["STUDENT"],
    },
    {
        _id: "16",
        icon: <BiSolidSelectMultiple size={30} />,
        pathname: "/dashboard/choose-lesson",
        title: "Choose Lessons",
        roles: ["STUDENT"],
    },
];
