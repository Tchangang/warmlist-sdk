import axios from 'axios';

export type GroupData = {
    name: string,
    customerId: string,
    createdAt: Date,
    id: string,
}

enum PostTemplate {
    a = 'CONTENT_A',
    b = 'CONTENT_B',
}

export type UserData = {
    name: string,
    linkedinId: string,
    customerId: string,
    group: string[],
    id: string,
    createdAt: Date,
    avatar?: string,
    description?: string,

}
export type PostData = {
    template: PostTemplate,
    summary: string,
    actorNavigationUrl: string,
    entityUrn: string,
    navigationUrl: string,
    userId: string,
    customerId: string,
    createdAt: Date,
    id: string,
    seen: boolean,
}
export class Sdk {
    constructor(private baseUrl: string, private apikey: string) {}
    private async get(path: string): Promise<any> {
        return axios.get(`${this.baseUrl}/${path}`, {
            headers: {
                apikey: this.apikey,
            }
        });
    }
    private async post(path: string, data: any): Promise<any> {
        return axios.post(`${this.baseUrl}/${path}`, data, {
            headers: {
                apikey: this.apikey,
            }
        });
    }
    private async put(path: string, data: any): Promise<any>{
        return axios.put(`${this.baseUrl}/${path}`, data, {
            headers: {
                apikey: this.apikey,
            }
        });
    }
    private async delete(path: string): Promise<any>{
        return axios.delete(`${this.baseUrl}/${path}`, {
            headers: {
                apikey: this.apikey,
            }
        });
    }
    public async listGroup(): Promise<GroupData[]> {
        const response = await this.get('api/group');
        return response.data;
    }
    public async listUsers(): Promise<UserData[]> {
        const response = await this.get('api/user');
        return response.data;
    }
    public async createUser(data: any): Promise<UserData> {
        const response = await this.post('api/user', data);
        return response.data;
    }
    public async listPosts(): Promise<PostData[]> {
        const response = await this.get('api/post');
        return response.data;
    }
    public async createPost(data: any): Promise<PostData> {
        const response = await this.post('api/post', data);
        return response.data;
    }
    public async markPostAsSeen(postId: string): Promise<void>{
        await this.put(`api/post/${postId}/seen`, {});
    }
    public async deleteUser(userId: string): Promise<void> {
        await this.delete(`api/user/${userId}`);
    }
    public async deletePost(postId: string): Promise<void> {
        await this.delete(`api/post/${postId}`);
    }
}
