<template>
    <div class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700">
        <div class="flex gap-4 mb-4">
            <Skeleton shape="circle" size="4rem" class="mr-2" />
                <div class="flex-1">
                    <Skeleton width="10rem" class="mb-2" />
                    <Skeleton width="5rem" class="mb-2" />
                    <Skeleton height=".6rem" />
                </div>
        </div>
        <Skeleton width="100%" height="150px" />
            <div class="flex justify-between mt-4">
                <Skeleton width="6rem" height="2.5rem" />
                <Skeleton width="6rem" height="2.5rem" />
            </div>
    </div>
</template>
<script setup>
import Skeleton from 'primevue/skeleton'
</script>
