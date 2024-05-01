import axios from 'axios';

export type GroupData = {
    name: string,
    customerId: string,
    createdAt: Date,
    id: string,
}

export enum PostTemplate {
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
export type PostParams = {
    "template": PostTemplate,
    "summary": string,
    "actorNavigationUrl": string,
    "entityUrn": string,
    "navigationUrl": string,
}
export type UserParams = {
    "linkedinId": string;
    "name": string;
    "avatar": string;
    "description": string;
}

export class PublicSdk {
    constructor(private baseUrl: string) {}
    private async get(path: string): Promise<any> {
        return axios.get(`${this.baseUrl}/${path}`);
    }
    async createAccount(email: string, password: string, linkedinUrl: string) {
        const response = await axios.post(`${this.baseUrl}/public/create-customer`, {
            email,
            password,
            linkedinUrl,
        });
        return {};
    }
    async login(email: string, password: string) {
        const response = await axios.post(`${this.baseUrl}/public/login`, {
            email,
            password,
        });
        return new Sdk(this.baseUrl, response.data.apikey);
    }
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
    public async createUser(data: UserParams): Promise<UserData> {
        const response = await this.post('api/user', data);
        return response.data;
    }
    public async listPosts(): Promise<PostData[]> {
        const response = await this.get('api/post');
        return response.data;
    }
    public async createPost(data: PostParams): Promise<PostData> {
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
    public async getJob(): Promise<string> {
        const response = await this.get('api/jobs');
        return response.data;
    }
}
