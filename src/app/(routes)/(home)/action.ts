'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createProjectAction(formData: {
    name: string;
    description?: string;
}) {
    try {
        const { name, description } = formData;

        // バリデーションチェック
        if (!name || name.trim() === '') {
            return { success: false, error: 'プロジェクト名は必須です' };
        }
        if (name.length > 100) {
            return { success: false, error: 'プロジェクト名は100文字以内で入力してください' };
        }
        if (description && description.length > 1000) {
            return { success: false, error: '説明は1000文字以内で入力してください' };
        }

        // DBへの登録
        await prisma.project.create({
            data: {
                name: name.trim(),
                description: description ? description.trim() : null,
            },
        });

        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Project Create Error:', error);
        return { success: false, error: 'プロジェクトの作成に失敗しました' };
    }
}