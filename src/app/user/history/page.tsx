'use client'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { columns, rows } from '@/utils/helper'
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    return (
        <DefaultLayout>
            <div className="mt-5 mb-4">
                <h1 className='text-xl font-bold text-primaryGreen italic mb-2' >Riwayat Peminjaman</h1>
                <Table >
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={rows}>
                        {(item) => (
                            <TableRow key={item.key}>
                                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>


        </DefaultLayout>
    )
}

export default page