import { Form, Upload, Progress } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import type { UploadFile } from 'antd/es/upload/interface';

import { uploadImage } from '../../api/upload';
import { useNoteStore } from '../../store/note';

const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

export const ImageUploadFormItem = ({ dataForm, fileList, setFileList, }: { dataForm?: any, fileList: UploadFile[], setFileList: Function }) => {
    const [progress, setProgress] = useState<number>(0);
    const { setMessage } = useNoteStore();

    const { mutate, isPending } = useMutation({
        mutationFn: (file: File) => uploadImage(file, setProgress),
        onSuccess: (res) => {
            setMessage('Картинку завантажено', 'success');

            const imageUrl = res.data.data.url;

            setFileList([
                {
                    uid: imageUrl,
                    name: res.data.data.filename,
                    url: imageUrl,
                },
            ]);

            dataForm.setFieldsValue({
                image: res.data.data.filename,
            });
        },
        onError: () => {
            setMessage('Помилка при завантаженні картинки');
        },
    });

    const customUpload = ({ file, onSuccess, onError }: any) => {
        if ((file.size / 1024 / 1024) > 9) {
            setFileList([]);
            return setMessage('Розмір картинки має бути не більше 9Мб');
        }

        if (!allowedTypes.includes(file.type)) {
            setFileList([]);
            return setMessage('Тільки зображення формату JPG, JPEG або PNG');
        }

        mutate(file as File, {
            onSuccess: () => onSuccess({}),
            onError: (err) => onError(err),
        });
    };

    const handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
        setFileList(fileList);

        dataForm.setFields([
            { name: 'image', value: fileList.length > 0 ? fileList[0] : null },
        ]);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />

            <div style={{ marginTop: 8 }}>{isPending ? 'Завантаження...' : 'Завантажити'}</div>
        </div>
    );

    return (
        <div className='wr-update'>
            <Form.Item
                label="Картинка"
                name="image"
                style={{ marginBottom: 5 }}
                rules={[{ required: true, message: 'Оберіть картинку' }]}
            >
                <Upload
                    name="file"
                    listType="picture-card"
                    className="picture-uploader"
                    customRequest={customUpload}
                    showUploadList={{ showPreviewIcon: false }}
                    fileList={fileList}
                    onChange={handleChange}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
            </Form.Item>
            <p style={{ margin: 0, color: "#ff3d00" }}>Не більше 9 мб.</p>

            {isPending && <Progress percent={progress} />}
        </div>
    );
};
