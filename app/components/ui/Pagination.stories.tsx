import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />;
  },
};

export const WithItemsPerPage: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    return (
      <Pagination
        currentPage={page}
        totalPages={25}
        onPageChange={setPage}
        itemsPerPage={perPage}
        onItemsPerPageChange={setPerPage}
        totalItems={245}
        showPageSize
      />
    );
  },
};

export const LargeDataset: Story = {
  render: () => {
    const [page, setPage] = useState(15);
    return (
      <Pagination
        currentPage={page}
        totalPages={500}
        onPageChange={setPage}
        totalItems={5000}
        itemsPerPage={10}
      />
    );
  },
};

export const MedicalResults: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(25);
    return (
      <Pagination
        currentPage={page}
        totalPages={12}
        onPageChange={setPage}
        itemsPerPage={perPage}
        onItemsPerPageChange={setPerPage}
        totalItems={287}
        showPageSize
      />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Pagination
      currentPage={5}
      totalPages={10}
      onPageChange={() => {}}
      disabled
    />
  ),
};
