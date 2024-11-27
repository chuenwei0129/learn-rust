<template>
  <table>
    <thead>
      <tr>
        <th v-for="col in columns" :key="col">{{ col.title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in data" :key="row">
        <td v-for="col in columns" :key="col">
          <template v-if="'render' in col">
            <Render
              :row="row"
              :column="col"
              :index="rowIndex"
              :render="col.render"
            ></Render>
          </template>
          <template v-else-if="'slot' in col">
            <slot
              :row="row"
              :column="col"
              :index="rowIndex"
              :name="col.slot"
            ></slot>
          </template>
          <template v-else>{{ row[col.key] }}</template>
        </td>
      </tr>
    </tbody>
  </table>
</template>
