import { Flex, Typography, Button, Radio, Table, Space } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { EditOutlined } from "@ant-design/icons";
import { useQuery, useMutation } from '@tanstack/react-query';

import { questions } from '../api';
import { useNoteStore } from '../store/note';
import { defaultDataModalQuestion } from '../constants/default-data';
import { QuestionEditModal } from '../components/modals/question-edit';
import { useNumberOfQuestionStore } from '../store/number-of-question';

const { Title } = Typography;


export const QuestionAnswerContainer = () => {
    const [position, setPosition] = useState<8 | 9>(9);
    const [dataModal, setDataModal] = useState(defaultDataModalQuestion);
    const [dataTable, setDataTable] = useState<any>({ data: [] });
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 20,
        total: 0,
    });
    const { record } = useNumberOfQuestionStore();

    const { setMessage } = useNoteStore();

    const {
        isLoading,
        refetch,
        data,
    } = useQuery<any, Error>({
        queryKey: ['questions', position, pagination.current, pagination.pageSize],
        queryFn: () => questions.getQuestions({ page: pagination.current, limit: pagination.pageSize, status: position }),
    });

    const {
        mutate: mutateCreate,
        isPending: isLoadingCreate
    } = useMutation({
        mutationFn: questions.create,
        onSuccess: (data) => {
            if (data?.message) {
                return setMessage(data?.message.join(", "));
            }

            refetch();
            hCloseModal();
            setMessage('Запитання успішно додано', 'success');
        },
    });

    const {
        mutate: mutateUpdate,
        isPending: isLoadingUpdate
    } = useMutation({
        mutationFn: questions.update,
        onSuccess: (data) => {
            if (data?.message) {
                return setMessage(data?.message.join(", "));
            }

            refetch();
            hCloseModal();
            setMessage('Запитання успішно оновленно', 'success');
        },
    });

    const handleEdit = useCallback((record: any) => {
        setDataModal({
            show: true,
            data: {
                ...record,
                cityId: record.city.id,
                statusId: record.status.id
            }
        });
    }, []);

    const columns = useMemo(() => [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
            render: () => null,
            width: 0,
            className: "hidden_сol",
        },
        {
            title: "№",
            key: "index",
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: "Username",
            dataIndex: "nickname",
            key: "nickname",
            render: (nickname: string) => nickname || '-'
        },
        {
            title: "Автор Ім'я",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Телефон",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Місто",
            dataIndex: "city",
            key: "city",
            render: (city: { id: number, name: string }) => city.name
        },
        {
            title: "Назва команди",
            dataIndex: "team",
            key: "team",
        },
        {
            title: "Запитання",
            dataIndex: "question",
            key: "question",
            render: (text: string) => text.length > 50 ? `${text.slice(0, 50)}...` : text,
        },
        {
            title: "Відповіді",
            dataIndex: "answer",
            key: "answer",
            render: (text: string) =>
                text.length > 50 ? `${text.slice(0, 50)}...` : text,
        },
        {
            title: "Дії",
            key: "actions",
            render: (_: any, record: any) => (
                <Space>
                    <Space>
                        <Button
                            color="primary"
                            variant="solid"
                            icon={<EditOutlined />}
                            size='small'
                            title="Редагувати"
                            onClick={() => handleEdit(record)}
                        ></Button>
                    </Space>
                </Space>
            ),
        },
    ], [handleEdit]);

    const hCloseModal = () => {
        setDataModal(defaultDataModalQuestion)
    }

    useEffect(() => {
        setPagination({
            current: 1,
            pageSize: 20,
            total: 0
        });
    }, [position]);

    useEffect(() => {
        setDataTable(data);
        record(data?.totalActive || 0)
    }, [data]);

    return (
        <Fragment>
            <Flex justify='space-between' gap={14}>
                <Title level={4} className='c-norm-title'>Запитання/Відповіді</Title>
                <Button type="primary" size='small' className='mob-btn-stan-none' onClick={() => setDataModal((prev) => ({ data: defaultDataModalQuestion.data, show: true }))}>+<span className='mob-btn-stan-none_span'>Додати</span></Button>
            </Flex>

            <Flex style={{ marginTop: 30 }}>
                <Radio.Group value={position} onChange={(e) => setPosition(e.target.value)}>
                    <Radio.Button value={9}>Нові {data?.totalActive}</Radio.Button>
                    <Radio.Button value={8}>Архів {data?.totalArchive}</Radio.Button>
                </Radio.Group>
            </Flex>

            <Table
                className='c-table-mt-40'
                columns={columns}
                dataSource={dataTable?.data || []}
                pagination={{
                    ...pagination,
                    total: dataTable?.total || 0,
                    showSizeChanger: true,
                }}
                onChange={(paginationData) => {
                    setPagination({
                        current: paginationData.current || 1,
                        pageSize: paginationData.pageSize || 20,
                        total: dataTable?.total || 0,
                    });
                }}
                size='small'
                scroll={{ x: 1000 }}
                rowKey="id"
                loading={isLoading}
            />

            <QuestionEditModal
                isModalOpen={dataModal.show}
                hCloseModal={hCloseModal}
                data={dataModal.data}
                isLoadBtn={isLoadingCreate || isLoadingUpdate}
                mutateCreate={mutateCreate}
                mutateUpdate={mutateUpdate}
            />
        </Fragment>
    )
}