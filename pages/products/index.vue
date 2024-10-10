<script setup>
import { ref } from 'vue'
const products = ref([])
const error = ref(null)

const getFileName = (path) => {
    return path.split('\\').pop();
}

try {
    const { data, error: fetchError } = await useFetch('http://webshop.test/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (fetchError.value) {
        error.value = 'Failed to fetch product data';
    } else {
        products.value = data.value.body.data.object.data.output.artikellist.artikel || [];
    }
} catch (err) {
    error.value = 'An unexpected error occurred: ' + err.message;
}
</script>

<template>
    <div class="container mx-auto w-1/2 py-8 divide-y space-y-8 divide-gray-300">
        <div class="bg-white shadow-md rounded-lg p-6">
            <h1 class="text-2xl font-bold mb-4">Product List</h1>
            <div v-if="error" class="text-red-500">{{ error }}</div>
            <div v-else>
                <div v-if="products.length === 0" class="text-gray-500">No products found.</div>
                <div v-else>
                    <div v-for="product in products" :key="product.artikelnummer" class="border-b border-gray-200 py-4">
                        <h2 class="text-xl font-semibold">{{ product.artikelbezeichnung }}</h2>
                        <p v-html="product.artikellangtext || product.artikelsondertext" class="text-gray-700"></p>
                        <p class="text-gray-600"><strong>Weight:</strong> {{ product.gewicht }} kg</p>
                        <p class="text-gray-600"><strong>Row ID:</strong> {{ product.rowid }}</p>
                        <p class="text-gray-600"><strong>Manufacturer ID:</strong> {{ product.herstellerid }}</p>
                        <p class="text-gray-600"><strong>Order Number:</strong> {{ product.bestellnummer }}</p>
                        <p class="text-gray-600"><strong>Inventory Management Type:</strong> {{ product.bestandsfuehrung_art }}</p>
                    <div class="text-gray-600">
                        <strong>Image:</strong>
                            <img :src="`http://webshop.test/api/${getFileName(product.bilder.bild.bilddatei)}`" alt="Product Image" class="w-full h-auto mt-2">
                        
                  <p><strong>File:</strong> {{ getFileName(product.bilder.bild.bilddatei) }}</p>
                            <p><strong>Type:</strong> {{ product.bilder.bild.bildtyp }}</p>
                            <p><strong>Source:</strong> {{ product.bilder.bild.bildsource }}</p>
                            <p><strong>Update Time:</strong> {{ product.bilder.bild.rowupdatetime }}</p>
                            <p><strong>Position:</strong> {{ product.bilder.bild.position }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>