export interface ICategory {
    id: number
    icon: string
    name: string
}

const categories: ICategory[] = [
    {
        "id": 1,
        "icon": "devicon-html5-plain",
        "name": "HTML"
    },
    {
        "id": 7,
        "icon": "devicon-javascript-plain",
        "name": "JavaScript"
    },
    {
        "id": 14,
        "icon": "devicon-php-plain",
        "name": "PHP"
    },
    {
        "id": 5,
        "icon": "devicon-mysql-original",
        "name": "MySQL"
    },
    {
        "id": 12,
        "icon": "devicon-linux-plain",
        "name": "Linux"
    },
    {
        "id": 2,
        "icon": "devicon-bash-plain",
        "name": "Bash"
    },
    {
        "id": 4,
        "icon": "devicon-docker-plain",
        "name": "Docker"
    },
    {
        "id": 8,
        "icon": "devicon-kubernetes-plain",
        "name": "Kubernetes"
    }
];


export {categories}