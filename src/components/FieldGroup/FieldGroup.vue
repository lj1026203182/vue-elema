<template>
  <div class="FieldGroup">
    <div class="input-group" :class="{ 'isError': error }">
      <input
        :type="type"
        :value="value"
        :placeholder="placeholder"
        :name="name"
        @input="$emit('input', $event.target.value)"
      />
      <van-button
        size="mini"
        v-if="btnTitle"
        :disabled="disabled"
        @click="$emit('onClick')"
        >{{ btnTitle }}</van-button
      >
    </div>

    <div class="error" v-if="error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: "FieldGroup",
  props: {
    type: {
      type: String,
      default: "text"
    },
    value: String,
    placeholder: String,
    name: String,
    btnTitle: String,
    disabled: Boolean,
    error: String
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style  scoped>
.input-group {
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 10px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.input-group input {
  width: 60%;
  border: none;
}
.isError {
  border: 1px solid red;
}
.input-group button {
  border: none;
  outline: none;
  color: #ccc;
  font-size: 14px;
  background: #fff;
}
.input-group button[disabled] {
  color: #aaa;
}
.is-invalid {
  border: 1px solid red;
}
.error {
  margin-left: 10px;
  color: red;
  padding-top: 5px;
}
</style>