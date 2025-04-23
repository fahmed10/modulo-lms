import * as MUI from "@mui/material";
import PageContainer from "../components/PageContainer";
import Loading from "../components/Loading";
import useAxiosData from "../hooks/useAxiosData";
import { Api, User } from "../Api";
import { Close } from "@mui/icons-material";
import { GridButton } from "../components/GridButton";
import { useMemo, useState } from "react";
import Dialog, { showDialog } from "../components/Dialog";

export default function ManageUsers() {
    const [users, loaded, setUsers] = useAxiosData<User[]>(Api.getUsers, []);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const visibleUsers = useMemo(() => users.filter(u => u.role === "faculty").slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [users, page, rowsPerPage]);

    if (!loaded) {
        return <Loading />;
    }

    return (
        <PageContainer title="Manage Users" className="flex-col max-w-xl mx-auto">
            <MUI.TableContainer component={MUI.Paper}>
                <MUI.Table aria-label="simple table">
                    <MUI.TableHead>
                        <MUI.TableRow>
                            <MUI.TableCell>First Name</MUI.TableCell>
                            <MUI.TableCell>Last Name</MUI.TableCell>
                            <MUI.TableCell>Email</MUI.TableCell>
                            <MUI.TableCell align="center">Actions</MUI.TableCell>
                        </MUI.TableRow>
                    </MUI.TableHead>
                    <MUI.TableBody>
                        {visibleUsers.map(user => (
                            <MUI.TableRow key={user._id}>
                                <MUI.TableCell>{user.firstName}</MUI.TableCell>
                                <MUI.TableCell>{user.lastName}</MUI.TableCell>
                                <MUI.TableCell>{user.email}</MUI.TableCell>
                                <MUI.TableCell align="center" className="!p-0">
                                    <MUI.IconButton onClick={() => showDialog(`delete-${user._id}`)}><Close /></MUI.IconButton>
                                    <Dialog id={`delete-${user._id}`} title="" content={`Are you sure you want to delete ${user.firstName} ${user.lastName}?`} actions={["Cancel", "Delete"]} onAction={async (action) => {
                                        if (action === "Cancel") {
                                            return true;
                                        }

                                        await Api.deleteUser(user._id);
                                        const newUsers = users.filter(({ _id }) => _id !== user._id);
                                        setUsers(newUsers);
                                        const userCount = newUsers.filter(u => u.role === "faculty").length;
                                        if (page * rowsPerPage >= userCount) {
                                            setPage(Math.floor(userCount / rowsPerPage) - 1)
                                        }
                                        return true;
                                    }} />
                                </MUI.TableCell>
                            </MUI.TableRow>
                        ))}
                    </MUI.TableBody>
                </MUI.Table>
                <MUI.TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={users.filter(u => u.role === "faculty").length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(_, newPage) => setPage(newPage)}
                    onRowsPerPageChange={e => setRowsPerPage(parseInt(e.target.value))}
                />
            </MUI.TableContainer>
            <GridButton onClick={() => showDialog("add-faculty")}>Add Faculty Member</GridButton>
            <Dialog id="add-faculty" title="Add Faculty Member" actions={["Cancel", "Create"]} onAction={async (action, state) => {
                if (action === "Cancel") {
                    return true;
                }

                const { data } = await Api.createUser({ ...state, role: "faculty" });

                if (data?.error) {
                    return false;
                }

                setUsers([...users, data]);
                return true;
            }} content={(state, setState) => <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <MUI.TextField value={state.firstName} onChange={e => setState("firstName", e.target.value)} type="text" label="First Name" />
                    <MUI.TextField value={state.lastName} onChange={e => setState("lastName", e.target.value)} type="text" label="Last Name" />
                </div>
                <div className="flex gap-4">
                    <MUI.TextField value={state.email} onChange={e => setState("email", e.target.value)} type="email" label="Email" />
                    <MUI.TextField value={state.password} onChange={e => setState("password", e.target.value)} type="password" label="Password" />
                </div>
            </div>} />
        </PageContainer>
    );
}