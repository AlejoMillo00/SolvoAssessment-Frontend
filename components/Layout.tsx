import TopBar from "./TopBar";

interface Props {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return <>
    <TopBar />
    {children}
    </>
}

export default Layout;