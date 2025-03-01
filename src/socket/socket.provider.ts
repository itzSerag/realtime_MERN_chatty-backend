import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ cors: { origin: "*" } })
export class WebSocketsGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: Server;
    private onlineUsers: Record<string, string> = {};

    handleConnection(client: Socket) {
        const userId = client.handshake.query.userId as string;
        if (!userId) {
            console.error("No userId provided in WebSocket handshake!");
            return;
        }
        this.onlineUsers[userId] = client.id;
        console.log(`User ${userId} connected. Socket ID: ${client.id}`);
        this.server.emit("getOnlineUsers", Object.keys(this.onlineUsers));
    }

    handleDisconnect(client: Socket) {
        const userId = Object.keys(this.onlineUsers).find((id) => this.onlineUsers[id] === client.id);

        if (userId) {
            delete this.onlineUsers[userId]; // Remove from online list
            console.log(`User ${userId} disconnected. Current online users:`, this.onlineUsers);
            this.server.emit("getOnlineUsers", Object.keys(this.onlineUsers)); // get all the connected users in the app
        }
    }


    getReceiverSocketId(userId: string) {
        return this.onlineUsers[userId];
    }
}
