import { AndroidLogo } from "phosphor-react-native";
import BB from "../assets/bb.svg";
import Nu from "../assets/nubank.svg";
import ABCBrasil from "../assets/Bancos/ABC Brasil.svg"
import ABNAMRO from "../assets/Bancos/ABN AMRO.svg"

interface IDataAppsProps {
  nameApp: string;
  colorIcon: string;
  icon: React.ReactNode;
  iconName: string;
  lenghtApp: string;
}

export const dataApps: IDataAppsProps[] = [
  {
    icon: <AndroidLogo />,
    iconName: "default",
    lenghtApp: "252",
    nameApp: "SosAPP",
    colorIcon: "green",
  },
  {
    icon: <BB width={40} height={40} />,
    iconName: "bb",
    lenghtApp: "252",
    nameApp: "BB",
    colorIcon: "green",
  },
  {
    icon: <Nu width={40} height={40} />,
    iconName: "nubank",
    lenghtApp: "252",
    nameApp: "Nubank",
    colorIcon: "green",
  },
  {
    icon: <ABNAMRO width={40} height={40} />,
    iconName: "ABN AMRO",
    lenghtApp: "252",
    nameApp: "ABN AMRO",
    colorIcon: "green",
  },
];
