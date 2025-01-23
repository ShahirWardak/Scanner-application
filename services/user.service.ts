export class UserService {
  private roomId: string = "";

  getRoomId(): string {
    return this.roomId;
  }

  setRoomId(val: string) {
    this.roomId = val;
  }
}

// Using this so that it is a singleton:
export const userService = new UserService();
