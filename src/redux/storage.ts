import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStroage = () => {
    return {
        getItem() {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: string) {
            return Promise.resolve(value);
        },
        removeItem() {
            return Promise.resolve();
        }
    }
};

const storage = typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStroage();

export default storage;