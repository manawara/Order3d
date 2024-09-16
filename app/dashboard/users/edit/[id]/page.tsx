import { getUserByID } from "@/action/user";
import FormUser from "@/components/User/FormUser";
import { userRole, userStatus } from "@/schema";
import { Role, Status } from "@/types/User.type";

const EditPageUser = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const user = await getUserByID(id);

  const roleMapping: Record<Role, userRole> = {
    [Role.USER]: userRole.USER,
    [Role.ADMIN]: userRole.ADMIN,
  };
  const statusMapping: Record<Status, userStatus> = {
    [Status.INACTIVE]: userStatus.INACTIVE,
    [Status.ACTIVE]: userStatus.ACTIVE,
  };
  return (
    <div>
      <h2 className="text-center mt-8 text-greenLight text-xl">
        Zmień dane uzytkownika {user?.name}
      </h2>
      {user && (
        <FormUser
          user={{
            id: user.id,
            name: user.name,
            email: user.email,
            password: "",
            status: statusMapping[user.status],
            role: roleMapping[user.role],
          }}
        />
      )}
    </div>
  );
};

export default EditPageUser;
