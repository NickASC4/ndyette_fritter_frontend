
<template>
    <main>
        <section>
            <header>
                <h2> Communities for @ {{$store.state.username}}</h2>
            </header>
        </section>
        <section>
            <h2>Community Controls</h2>
            <MakeCommunityForm />
            <DeleteCommunityForm /> 
        </section>
        <section>
            <header>
                <div class = "communityLeft">
                    <h2>
                        Viewing all freets
                        <span v-if="$store.state.filter">
                            in {{ $store.state.filter }}
                        </span>
                    </h2>
                </div>
                <div class = "right">
                  <GetCommunityFreetsForm
                    ref="getCommunityFreetsForm"
                    value="id"
                    placeholder="🔍 Enter ID"
                    button="🔄 Get community freets"
                  /> 
                </div>
            </header>
            <section v-if="$store.state.freets.length"
            >
            <FreetComponent
              v-for="freet in $store.state.freets"
              :key="freet.id"
              :freet="freet"
            />
            </section>
            <article v-else>
                <h2> No Freets found in community</h2>
            </article>
        </section>
    </main>
</template>





<script>
import DeleteCommunityForm from '@/components/Community/DeleteCommunityForm.vue';
import MakeCommunityForm from '@/components/Community/MakeCommunityForm.vue';
import GetCommunityFreetsForm from '@/components/Community/GetCommunityFreetsForm.vue';
import FreetComponent from '@/components/Freet/FreetComponent.vue';

export default {
  name: 'CommunitiesPage',
  components: {DeleteCommunityForm, FreetComponent, MakeCommunityForm, GetCommunityFreetsForm},
  mounted() {
    this.$refs.GetCommunityFreetsForm.submit();
  }
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}

header, header > * {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    margin-right: 10px;
}

main {
  background-color: rgb(225, 232, 237);
}
section .scrollbox {
  flex: 1 0 50vh;
  padding: 3%;
  overflow-y: scroll;
}
</style>

